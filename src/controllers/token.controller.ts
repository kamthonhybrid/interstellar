import { Token } from "../models/ecs.models";
import ecs from '../constants/ecs.json'

import NodeCache from "node-cache";


const mcache = new NodeCache();

class TokenController {

  async getEcsToken() {
    const tokenKey: string = "token_ecs";
    const tokenExp: string = "token_ecs_exp"
    let cachedToken = mcache.get(tokenKey);
    let cachedExp: number = mcache.get(tokenExp) ?? 0;
    let currentTime = Date.now();

    if (cachedToken && currentTime < cachedExp * 1000) {
      return cachedToken;
    } else {
      const tokenData = await Token.findOne({ name: tokenKey });
      if (tokenData && currentTime < parseInt(tokenData['exp']) * 1000) {

        // Save to memory
        mcache.set(tokenKey, tokenData['token'], 0);
        mcache.set(tokenExp, tokenData['exp'], 0);
        return tokenData['token'];
      } else {
        let [token, exp] = await this.reqTokenEcs(tokenKey)

        // Save to memory
        mcache.set(tokenKey, token, 0);
        mcache.set(tokenExp, exp, 0);
        return token;
      }

    }
  }

  async reqTokenEcs(tokenKey: string) {

    let url = ecs.ecs_base_url + ecs.ecs_token_url;
    let payload = JSON.stringify({ "username": ecs.ecs_user, "password": ecs.ecs_password });
    let headers = { 'api_key': ecs.ecs_api_key, 'Content-Type': 'application/json' };

    const response = await fetch(url, { method: 'post', body: payload, headers: headers })
    const data: any = await response.json()

    // Update Token in MongoDB
    const query = { name: tokenKey };
    const update = { $set: { name: tokenKey, user: data['username'], token: data['token'], exp: data['exp'] } };
    const options = { upsert: true };
    const updateToken = await Token.updateOne(query, update, options);
    return [data['token'], data['exp']];
  }

}


export const tokenController = new TokenController();