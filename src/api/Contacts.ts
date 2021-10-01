/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddressDTO {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

export interface CallRecord {
  name?: Name;
  phone?: string | null;
}

export interface ContactDTO {
  name: NameDTO;
  address?: AddressDTO;
  phone?: PhoneDTO[] | null;
  email?: string | null;
}

export interface ExistingContactDTO {
  name: NameDTO;
  address?: AddressDTO;
  phone?: PhoneDTO[] | null;
  email?: string | null;

  /** @format int32 */
  id?: number;
}

export interface Name {
  first?: string | null;
  middle?: string | null;
  last?: string | null;
}

export interface NameDTO {
  first?: string | null;
  middle?: string | null;
  last?: string | null;
}

export interface PhoneDTO {
  number?: string | null;
  type?: PhoneTypeDTO;
}

export type PhoneTypeDTO = "Home" | "Work" | "Mobile";

export namespace Contacts {
  /**
   * No description
   * @tags Contacts
   * @name ContactsList
   * @request GET:/Contacts
   */
  export namespace ContactsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ExistingContactDTO[];
  }
  /**
   * No description
   * @tags Contacts
   * @name ContactsCreate
   * @request POST:/Contacts
   */
  export namespace ContactsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ContactDTO;
    export type RequestHeaders = {};
    export type ResponseBody = ExistingContactDTO;
  }
  /**
   * No description
   * @tags Contacts
   * @name ContactsDetail
   * @request GET:/Contacts/{id}
   */
  export namespace ContactsDetail {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ExistingContactDTO;
  }
  /**
   * No description
   * @tags Contacts
   * @name ContactsDelete
   * @request DELETE:/Contacts/{id}
   */
  export namespace ContactsDelete {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Contacts
   * @name ContactsUpdate
   * @request PUT:/Contacts/{id}
   */
  export namespace ContactsUpdate {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = ContactDTO;
    export type RequestHeaders = {};
    export type ResponseBody = ExistingContactDTO;
  }
  /**
   * No description
   * @tags Contacts
   * @name CallListList
   * @request GET:/Contacts/call-list
   */
  export namespace CallListList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CallRecord[];
  }
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:21268" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Contacts API
 * @version v1
 * @baseUrl http://localhost:21268
 * @contact Jordan Upperman <Jordaneupperman@gmail.com> (https://github.com/Jupperman/ContactsApi)
 *
 * Api for CRUD operations against a contact list.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  contacts = {
    /**
     * No description
     *
     * @tags Contacts
     * @name ContactsList
     * @request GET:/Contacts
     */
    contactsList: (params: RequestParams = {}) =>
      this.request<ExistingContactDTO[], any>({
        path: `/Contacts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contacts
     * @name ContactsCreate
     * @request POST:/Contacts
     */
    contactsCreate: (data: ContactDTO, params: RequestParams = {}) =>
      this.request<ExistingContactDTO, any>({
        path: `/Contacts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contacts
     * @name ContactsDetail
     * @request GET:/Contacts/{id}
     */
    contactsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ExistingContactDTO, any>({
        path: `/Contacts/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contacts
     * @name ContactsDelete
     * @request DELETE:/Contacts/{id}
     */
    contactsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Contacts/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contacts
     * @name ContactsUpdate
     * @request PUT:/Contacts/{id}
     */
    contactsUpdate: (id: number, data: ContactDTO, params: RequestParams = {}) =>
      this.request<ExistingContactDTO, any>({
        path: `/Contacts/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contacts
     * @name CallListList
     * @request GET:/Contacts/call-list
     */
    callListList: (params: RequestParams = {}) =>
      this.request<CallRecord[], any>({
        path: `/Contacts/call-list`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
