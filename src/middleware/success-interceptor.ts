import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class SuccessInterceptor implements InterceptorInterface {
	intercept(action: Action, content: any) {
		return { 
            statusCode: 200, 
            data: content 
        };
	}
}
