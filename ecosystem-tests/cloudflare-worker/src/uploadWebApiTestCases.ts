import OpenAI, { toFile } from 'openai';
import { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';

/**
 * Tests uploads using various Web API data objects.
 * This is structured to support running these tests on builtins in the environment in
 * Node or Cloudflare workers etc. or on polyfills like from node-fetch/formdata-node
 */
export function uploadWebApiTestCases({
	client,
	it,
	expectEqual,
	expectSimilar,
}: {
	/**
	 * OpenAI client instance
	 */
	client: OpenAI;
	/**
	 * Jest it() function, or an imitation in envs like Cloudflare workers
	 */
	it: (desc: string, handler: () => Promise<void>) => void;
	/**
	 * Jest expect(a).toEqual(b) function, or an imitation in envs like Cloudflare workers
	 */
	expectEqual(a: unknown, b: unknown): void;
	/**
	 * Assert that the levenshtein distance between the two given strings is less than the given max distance.
	 */
	expectSimilar(received: string, expected: string, maxDistance: number): void;
}) {
	const url = 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3';
	const filename = 'sample-1.mp3';

	const correctAnswer =
		'It was anxious to find him no one that expectation of a man who were giving his father enjoyment. But he was avoided in sight in the minister to which indeed,';
	const model = 'whisper-1';

	async function typeTests() {
		// @ts-expect-error this should error if the `Uploadable` type was resolved correctly
		await client.audio.transcriptions.create({ file: { foo: true }, model: 'whisper-1' });
		// @ts-expect-error this should error if the `Uploadable` type was resolved correctly
		await client.audio.transcriptions.create({ file: null, model: 'whisper-1' });
		// @ts-expect-error this should error if the `Uploadable` type was resolved correctly
		await client.audio.transcriptions.create({ file: 'test', model: 'whisper-1' });
	}

	it(`streaming works`, async function () {
		const stream = await client.chat.completions.create({
			model: 'gpt-4',
			messages: [{ role: 'user', content: 'Say this is a test' }],
			stream: true,
		});
		const chunks = [];
		for await (const part of stream) {
			chunks.push(part);
		}
		expectSimilar(chunks.map((c) => c.choices[0]?.delta.content || '').join(''), 'This is a test', 10);
	});

	it('handles File', async () => {
		const file = await fetch(url)
			.then((x) => x.arrayBuffer())
			.then((x) => new File([x], filename));

		const params: TranscriptionCreateParams = { file, model };

		const result = await client.audio.transcriptions.create(params);
		expectSimilar(result.text, correctAnswer, 12);
	});

	it('handles Response', async () => {
		const file = await fetch(url);

		const result = await client.audio.transcriptions.create({ file, model });
		expectSimilar(result.text, correctAnswer, 12);
	});

	const fineTune = `{"prompt": "<prompt text>", "completion": "<ideal generated text>"}`;

	it('toFile handles string', async () => {
		// @ts-expect-error we don't type support for `string` to avoid a footgun with passing the file path
		const file = await toFile(fineTune, 'finetune.jsonl');
		const result = await client.files.create({ file, purpose: 'fine-tune' });
		expectEqual(result.status, 'uploaded');
	});
	it('toFile handles Blob', async () => {
		const result = await client.files.create({ file: await toFile(new Blob([fineTune]), 'finetune.jsonl'), purpose: 'fine-tune' });
		expectEqual(result.status, 'uploaded');
	});
	it('toFile handles Uint8Array', async () => {
		const result = await client.files.create({
			file: await toFile(new TextEncoder().encode(fineTune), 'finetune.jsonl'),
			purpose: 'fine-tune',
		});
		expectEqual(result.status, 'uploaded');
	});
	it('toFile handles ArrayBuffer', async () => {
		const result = await client.files.create({
			file: await toFile(new TextEncoder().encode(fineTune).buffer, 'finetune.jsonl'),
			purpose: 'fine-tune',
		});
		expectEqual(result.status, 'uploaded');
	});
	it('toFile handles DataView', async () => {
		const result = await client.files.create({
			file: await toFile(new DataView(new TextEncoder().encode(fineTune).buffer), 'finetune.jsonl'),
			purpose: 'fine-tune',
		});
		expectEqual(result.status, 'uploaded');
	});
}
