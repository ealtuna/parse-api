import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

/**
 * Decorates responses with `statusCode`, setting the original
 * response as a child element with the key `data`.
 */
@Interceptor()
export class SuccessInterceptor implements InterceptorInterface {
	intercept(action: Action, content: any) {
		return { 
            statusCode: 200, 
            data: content 
        };
	}
}
