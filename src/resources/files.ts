// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIResource } from 'openai/resource';
import * as API from './index';
import { type Uploadable, multipartFormRequestOptions } from 'openai/core';
import { Page } from 'openai/pagination';

export class Files extends APIResource {
  /**
   * Upload a file that contains document(s) to be used across various
   * endpoints/features. Currently, the size of all the files uploaded by one
   * organization can be up to 1 GB. Please contact us if you need to increase the
   * storage limit.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<FileObject> {
    return this.post('/files', multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Returns information about a specific file.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileObject> {
    return this.get(`/files/${fileId}`, options);
  }

  /**
   * Returns a list of files that belong to the user's organization.
   */
  list(options?: Core.RequestOptions): Core.PagePromise<FileObjectsPage, FileObject> {
    return this.getAPIList('/files', FileObjectsPage, options);
  }

  /**
   * Delete a file.
   */
  del(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileDeleted> {
    return this.delete(`/files/${fileId}`, options);
  }

  /**
   * Returns the contents of the specified file
   */
  retrieveFileContent(fileId: string, options?: Core.RequestOptions): Core.APIPromise<string> {
    return this.get(`/files/${fileId}/content`, {
      ...options,
      headers: { Accept: 'application/json', ...options?.headers },
    });
  }
}

/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
export class FileObjectsPage extends Page<FileObject> {}
// alias so we can export it in the namespace
type _FileObjectsPage = FileObjectsPage;

export type FileContent = string;

export interface FileDeleted {
  id: string;

  deleted: boolean;

  object: string;
}

export interface FileObject {
  id: string;

  bytes: number;

  created_at: number;

  filename: string;

  object: string;

  purpose: string;

  status?: string;

  status_details?: string | null;
}

export interface FileCreateParams {
  /**
   * Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be
   * uploaded.
   *
   * If the `purpose` is set to "fine-tune", each line is a JSON record with "prompt"
   * and "completion" fields representing your
   * [training examples](/docs/guides/fine-tuning/prepare-training-data).
   */
  file: Uploadable;

  /**
   * The intended purpose of the uploaded documents.
   *
   * Use "fine-tune" for [Fine-tuning](/docs/api-reference/fine-tunes). This allows
   * us to validate the format of the uploaded file.
   */
  purpose: string;
}

export namespace Files {
  export import FileContent = API.FileContent;
  export import FileDeleted = API.FileDeleted;
  export import FileObject = API.FileObject;
  export type FileObjectsPage = _FileObjectsPage;
  export import FileCreateParams = API.FileCreateParams;
}
