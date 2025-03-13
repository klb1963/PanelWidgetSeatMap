import {IAreaService} from 'sabre-ngv-app/app/services/impl/IAreaService';
import {BannerConfig} from 'sabre-ngv-app/app/services/impl/BannerConfig';
import {showButtonAction} from './showButtonAction';
import {getService} from '../Context';

export const showBanners = (): void => {
    const areaService: IAreaService = getService(IAreaService);

    const configInfo: BannerConfig = {
        text: 'Info banner without title',
    };
    areaService.showBanner(configInfo);

    const configError: BannerConfig= {
        type: 'Error',
        text: 'Error banner text',
        title: 'Error title',
    };
    areaService.showBanner(configError);

    const configSuccess: BannerConfig = {
        type: 'Success',
        text: 'Success banner text',
        title: 'Success title',
    };
    areaService.showBanner(configSuccess);

    const configWarning: BannerConfig = {
        type: 'Warning',
        text: 'Warning banner text',
        title: 'Warning title',
        label: 'Warning action',
        action: showButtonAction
    }
    areaService.showBanner(configWarning);
}