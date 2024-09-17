import { Request, Response } from 'express'
import ecs from '../constants/ecs.json'
import msg from '../constants/msg.json'
import fetch from "node-fetch"
import { utils } from '../utils/utility';



class EcsController {
    async getSiteInfoAll(req: Request, res: Response) {

        let url = ecs.ecs_base_url + ecs.url_ecs_site_info_all;
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0)
            return res.json({ code: 0, message: msg["0"], data: data['data'] });
        else {
            return res.json({ code: 201, message: msg["201"] });
        }
    }

    async getSiteList(req: Request, res: Response) {
        let url = ecs.ecs_base_url + ecs.url_ecs_site_list;
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0)
            return res.json({ code: 0, message: msg["0"], data: data['data'] });
        else {
            return res.json({ code: 201, message: msg["201"] });
        }
    }

    async getSiteInfo(req: Request, res: Response) {
        const siteId = req.query.site_id

        if (!siteId) {
            // return res.json({ code: 201, message: msg["201"] });
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_site_info + siteId;
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0) {
            const respSite : any = data['data'][0] ? { site: data['data'][0] } : {}
            if (respSite['site']['site_pic'] != null) {
                respSite['site']['site_pic'] = ecs.ecs_base_url + respSite['site']['site_pic']
            }

            let specificEnergy = respSite['site']['solar_today'] / respSite['site']['capacity']
            
            respSite['site']['pr_ratio'] = respSite['site']['irra_daily'] < 0 ? 0 :  ((specificEnergy / respSite['site']['irra_daily']) * 100)

            return res.json({ code: 0, message: msg["0"], data: respSite });
        }
        else {
            return res.json({ code: 201, message: msg["201"] });
        }
    }


    async energyFlow(req: Request, res: Response) {
        const siteId = req.query.site_id

        if (!siteId) {
            // return res.json({ code: 201, message: msg["201"] });
            return res.json({ code: 0, message: msg["0"], data: {} });

        }

        let url = ecs.ecs_base_url + ecs.url_energy_flow + siteId;
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        if (data['code'] == null)
            return res.json({ code: 0, message: msg["0"], data: data });
        else {
            // return res.json({ code: 201, message: msg["201"] });
            return res.json({ code: 0, message: msg["0"], data: {} });

        }
    }


    async getDeviceList(req: Request, res: Response) {
        const siteId: any = req.query.site_id;
        const deviceId: any = req.query.device_id;


        let url = ecs.ecs_base_url + ecs.url_ecs_device_list.replace("[SiteID]", siteId ?? '').replace("[DeviceID]", deviceId ?? '')

        res.json({ "url": url })
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0) {
            // const respSite = data['data'][0] ? { site: data['data'][0] } : {}
            return res.json({ code: 0, message: msg["0"], data: data['data'] });
        }
        else {
            return res.json({ code: 201, message: msg["201"] });
        }
    }


    async getLastest(req: Request, res: Response) {
        const siteId: any = req.query.site_id;

        if (!siteId) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_lastest.replace("[SiteID]", siteId ?? '')
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0) {
            return res.json({ code: 0, message: msg["0"], data: data['data'] });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getHistory(req: Request, res: Response) {
        const deviceId: any = req.query.device_id;
        const startTime: any = req.query.start_time;
        const endTime: any = req.query.end_time;

        if (!deviceId || !startTime || !endTime) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_device_history.replace("[DeviceID]", deviceId).replace("[StartTime]", startTime).replace("[EndTime]", endTime)
        // console.log(url);
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)
        if (data['code'] == 0) {
            return res.json({ code: 0, message: msg["0"], data: data['data'] });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getSummaryPower(req: Request, res: Response) {
        const siteId: any = req.query.site_id;
        const dateTime: any = req.query.date;

        if (!siteId || !dateTime) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_summary_power.replace("[SiteID]", siteId).replace("[Date]", dateTime)
        // console.log(url);
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const relFactor = 0.1
        const absFactor = 1

        const data = await response.json()

        const dailyLoadData = data['LOAD']
        const dailySolarData = data['INV']
        const limitedPeriod: {}[] = []
        await dailyLoadData.map((item: any, idx: number) => {
            var time: Date = new Date(Date.parse(item.date))
            const h: number = time.getHours();
            if (h >= 8 && h <= 16) {
                if ((dailySolarData[idx].PACTO >= (item.PACTO * (absFactor - relFactor) - 1))
                    && (dailySolarData[idx].PACTO <= (item.PACTO * (absFactor + relFactor) + 1))) {
                    limitedPeriod.push({ PACTO: dailySolarData[idx].PACTO, date: item.date })
                }
            }
        });
        data['LIMIT'] = limitedPeriod

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getEnergyComparison(req: Request, res: Response) {
        const siteId: any = req.query.site_id;
        const years: any = req.query.years;
        const month: any = req.query.month;

        if (!siteId || !years || !month) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_energy_comparison.replace("[SiteID]", siteId).replace("[Year]", years).replace("[Month]", month)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getPowerDistribution(req: Request, res: Response) {
        const siteId: any = req.query.site_id;
        const year: any = req.query.year;


        if (!siteId || !year ) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_power_distribution.replace("[SiteID]", siteId).replace("[Year]", year)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getDailyAnalysis(req: Request, res: Response) {
        const deviceId: any = req.query.device_id;
        const params: any = req.query.params;
        const date: any = req.query.date;

        if (!deviceId || !params || !date) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_daily_analysis.replace("[DeviceID]", deviceId).replace("[Params]", params).replace("[Date]", date)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getDailyDcPower(req: Request, res: Response) {
        const deviceId: any = req.query.device_id;
        const params: any = req.query.dc_param;
        const date: any = req.query.date;


        if (!deviceId || !params || !date) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_daily_dc_power.replace("[DeviceID]", deviceId).replace("[DcParams]", params).replace("[Date]", date)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getDailyTemperature(req: Request, res: Response) {
        const deviceId: any = req.query.device_id;
        const params: any = req.query.dc_param;
        const date: any = req.query.date;
        const emiId: any = req.query.emi_deviceId


        if (!deviceId || !params || !date || !emiId) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_temperature.replace("[DeviceID]", deviceId).replace("[DcParams]", params).replace("[Date]", date).replace("[EmiID]", emiId)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getSimulator(req: Request, res: Response) {
        const SiteID: any = req.query.site_id;

        if (!SiteID) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_simulation.replace("[SiteID]", SiteID)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

    async getPrediction(req: Request, res: Response) {
        const SiteID: any = req.query.site_id;

        if (!SiteID) {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }

        let url = ecs.ecs_base_url + ecs.url_ecs_prediction.replace("[SiteID]", SiteID)

        console.log(url)
        const response = await fetch(url, { method: 'get', headers: await utils.getEcsToken() })

        if (response.status != 200) {
            return res.json({ code: 202, message: msg["202"] });
        }

        const data = await response.json()
        // console.log(data)

        if (data['code'] == null) {
            return res.json({ code: 0, message: msg["0"], data: data });
        }
        else {
            return res.json({ code: 0, message: msg["0"], data: {} });
        }
    }

}


export const ecsController = new EcsController();