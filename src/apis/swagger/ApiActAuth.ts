import { ApiUrl } from "./ApiUrl";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";

export class AuthApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getList(sendData?: any): Promise<any[]> {
		if (!sendData) {
			//websocket 연결후 받아오는 데이타
			sendData = {
				key: "lG16MCMIrhewZWCBo87ZkVbctQZJPrnnSAf05vqbKldjRFILtndoND53GJRnYvgOigaykRQ0P9E4pzMtn19Kxx8YQkZ0+COiyT+38XpgJWeudibWo6nqsC7oX0VYyucpln3bGu3/bICb9A+ULHlVxVpWZ0d60aa/ueNO0KF3Mnw=",
				userInfo:
					"tCC5QJU77CQ5JTKL77yBUn50saljFghE8DMy1IDq0Aqn+PXTI+BuuN30H7IpeWKrDYvNcyoZl6OgVu2rt14SmvCUfkuwZqR0UjZbmX1BXiOFP8AUeZGEyfk5KkyecVFCC6AAC+V5uqj5iVhakhqL2yO8bYAxutox9LlHgZKGotC1aqZZh9qNQVtMeKCknU8yV6MQaq6rekar5F0SdP4G20DYs/E/d50Xq1Ipfxck+Wm0z9UQTT7s3toFav1oL9uZNBVTbSmuafbg3m9XqN6GeDTsytHAyAQeJqDDQU8OP3sccA/Y2ZTG80/a0BTqlfUOmqXjiHuH0zC7wjLxw5nHpOKCeitPKSgzwwJ/WG8lHg5LiK8/7YlLx1LDcEwS6nItLbKSsCMN+VTZkO1qC6r1gT0vD2JjSWPxbtIPjEem5oPh0uL9lbTipy+G17a6TRhCeDq0sEWBolqSvsKtg3XWD4QHZ15efeAWaTMw60YraRghmOz+2wIqYAIW/qIK16ECS5L0fblMSs+SPPTB9+H7UTwdPvO+xDHEeuT5fDb5xB1KqGZmiXjBfsHzpKRJljYkXVop4h6pvneMWlrf2J8AnQ/EULxB+jOCBeyaEBHwkU3ZfYyvmX8CYgaDgmVy1k+PHtERcq1Xg1ls2RznTIut0hLu2D8CJyTbTkyNsrTp4Z8=",
			};
		}

		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.AUTH_POST_LOGIN,
			data: sendData,
		});

		console.log("ProjectApi-getList", data);
		return data.data;
	}
}

const ApiActAuth = new AuthApi();

export default ApiActAuth;
