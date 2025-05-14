import {
  type IDataObject,
  type IExecuteFunctions,
  type IHookFunctions,
  type IHttpRequestMethods,
  type ILoadOptionsFunctions,
  type IRequestOptions,
  NodeApiError
} from 'n8n-workflow';

/**
 * Header HTTP mặc định sử dụng cho các request API
 *
 * Bao gồm các thông tin cơ bản:
 * - `Content-Type`: Xác định kiểu dữ liệu của nội dung gửi đi là JSON và sử dụng mã hóa UTF-8.
 * - `Accept`: Yêu cầu phản hồi từ server ở định dạng JSON.
 *
 * Có thể được sử dụng như phần header mặc định trong các hàm gọi API, giúp đảm bảo định dạng dữ liệu đúng chuẩn.
 */
export const HTTP_HEADERS: IDataObject = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json',
};

/**
 * Gửi request đến API bất kỳ với thông tin xác thực từ credential đã cấu hình
 *
 * Hàm này dùng để thực hiện các request HTTP (GET, POST, PUT, DELETE, ...) đến một API cụ thể.
 * Nó sử dụng credential có tên `nameCredential` để lấy thông tin xác thực cần thiết và hỗ trợ cấu hình linh hoạt
 * với URL gốc (`baseUrl`), endpoint, body, query string và headers.
 *
 * @param this - Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param nameCredential - Tên của credential được lưu trong hệ thống để truy xuất thông tin xác thực (API Key, Token, v.v.).
 * @param method - Phương thức HTTP cần sử dụng (ví dụ: 'GET', 'POST', 'PUT', 'DELETE').
 * @param baseUrl - URL gốc của API (ví dụ: 'https://api.example.com').
 * @param endpoint - Đường dẫn cụ thể tới tài nguyên trong API (ví dụ: '/v1/users').
 * @param body - Dữ liệu gửi kèm trong phần thân của request (áp dụng với POST, PUT...).
 * @param qs - Tham số truy vấn (query string) cần gửi kèm trong URL.
 * @param headers - Header tùy chỉnh cần đính kèm (nếu có).
 *
 * @description
 * Hàm hỗ trợ gửi HTTP request linh hoạt đến bất kỳ API nào với xác thực từ credential, thường dùng trong các workflow tự động hóa.
 * Đảm bảo endpoint được nối đúng cách với baseUrl và hỗ trợ thêm các dữ liệu tùy chỉnh như headers, query, body.
 *
 * @returns {Promise<any>} - Promise chứa phản hồi từ API, có thể là bất kỳ kiểu dữ liệu nào phụ thuộc vào API gọi đến.
 */
export async function nqdevApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  nameCredential: string,
  method: IHttpRequestMethods,
  baseUrl: string,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {}, // query parameters
  headers: IDataObject = {}
): Promise<any> {

  const httpHeaders: IDataObject = {
    'nqdev-version': '1.0.0', // Your API version
    'SentWith': 'n8n-nqdev', // Custom header for identification
  }, httpQs: IDataObject = {
    n8n: 'nqdev', // Query parameter for identification
  };

  Object.assign(httpHeaders, HTTP_HEADERS, headers);
  Object.assign(httpQs, qs);

  const options: IRequestOptions = {
    method: method,
    baseURL: (baseUrl ?? '').replace(/\/$/, ''), // remove trailing slashes
    uri: `${endpoint}`,
    headers: httpHeaders, // Custom headers
    qs: httpQs, // Query string parameters
    json: true, // Parse response as JSON
    followRedirect: true, // This will ensure the request follows redirects
    followAllRedirects: true, // This will ensure the request follows redirects
  };

  // Attach body if it's provided
  if (Object.keys(body).length) {
    Object.assign(options, {
      body: body,
    });
  }

  try {
    // Make the request using helpers.requestWithAuthentication
    const response = await this.helpers.requestWithAuthentication.call(this, nameCredential, options);

    // Check if the response indicates an error (e.g., invalid credentials)
    // if (response.success === '101') {
    //   throw new NodeApiError(this.getNode(), response as JsonObject, {
    //     message: 'Invalid credentials or API error!',
    //   });
    // }

    // Return the response if successful
    return response;
  } catch (error) {
    // Handle any errors during the API request
    throw new NodeApiError(this.getNode(), error, {
      message: 'Error making the API request.',
    });
  }
}
