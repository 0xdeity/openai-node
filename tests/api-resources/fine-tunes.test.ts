// File generated from our OpenAPI spec by Stainless.

import OpenAI from '~/index';

const openAI = new OpenAI({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource fineTunes', () => {
  test('create: only required params', async () => {
    const response = await openAI.fineTunes.create({ training_file: 'file-ajSREls59WBbvgSzJSVWxMCB' });
  });

  test('create: required and optional params', async () => {
    const response = await openAI.fineTunes.create({
      training_file: 'file-ajSREls59WBbvgSzJSVWxMCB',
      batch_size: 0,
      classification_betas: [0, 0, 0],
      classification_n_classes: 0,
      classification_positive_class: 'string',
      compute_classification_metrics: true,
      learning_rate_multiplier: 0,
      model: 'string',
      n_epochs: 0,
      prompt_loss_weight: 0,
      suffix: 'x',
      validation_file: 'file-XjSREls59WBbvgSzJSVWxMCa',
    });
  });

  test('retrieve', async () => {
    const response = await openAI.fineTunes.retrieve('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      openAI.fineTunes.retrieve('ft-AF1WoRqd3aJAHsqc9NY7iL8F', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OpenAI.NotFoundError);
  });

  test('list', async () => {
    const response = await openAI.fineTunes.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(openAI.fineTunes.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OpenAI.NotFoundError,
    );
  });

  test('cancel', async () => {
    const response = await openAI.fineTunes.cancel('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
  });

  test('cancel: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      openAI.fineTunes.cancel('ft-AF1WoRqd3aJAHsqc9NY7iL8F', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OpenAI.NotFoundError);
  });

  // Prism chokes on this
  test.skip('listEvents', async () => {
    const response = await openAI.fineTunes.listEvents('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
  });

  // Prism chokes on this
  test.skip('listEvents: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      openAI.fineTunes.listEvents(
        'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
        { stream: false },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenAI.NotFoundError);
  });
});
