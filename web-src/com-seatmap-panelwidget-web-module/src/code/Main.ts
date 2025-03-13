import {Module} from 'sabre-ngv-core/modules/Module';
import { getService } from './Context';

import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton'; // правая панель Workflow
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig'; // конфигурация правой панели
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService'; // подключаемые RedApp сервисы

import { DrawerService } from "sabre-ngv-app/app/services/impl/DrawerService";
import { LargeWidgetDrawerConfig } from 'sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig';

import { showBanners } from './components/showBanners'; // Добавляем showBanners
import { SeatMapPanel } from './views/SeatMapPanel'; // Основной компонент
import { SeatMapModal } from './views/SeatMapModal'; // Открываемое модальное окно

export class Main extends Module { 
    init(): void { 
        super.init();
        this.setup(); // сетап кнопок

        // Конфигурация виджета
        let cfgAbstractViewOptions = {
            title: 'Seat Map Selection',
            maximized: false,
            cssClass: 'dn-panel results-panel-widget-container',

            actions: [
                {
                    caption: 'CANCEL',
                    actionName: 'close',
                    type: 'secondary',
                    cssClass: 'btn',
                    className: 'app.common.views.Button'
                },
                {
                    caption: 'CONFIRM',
                    actionName: 'confirmSelection',
                    type: 'default',
                    cssClass: 'btn',
                    className: 'app.common.views.Button'
                }
            ]
        };

        // Создаём конфигурацию для виджета SeatMap
        const drawerConfig = new LargeWidgetDrawerConfig(SeatMapPanel, SeatMapModal, cfgAbstractViewOptions);

        console.log("➡️ Registering SeatMapPanel in DrawerService...");
        getService(DrawerService).addConfig(['shopping-flight-segment'], drawerConfig);
        console.log("✅ SeatMap Widget registered in DrawerService");
    } 

    private setup(): void {
        const baseCssClassNames = 'btn btn-secondary side-panel-button redapp-web-customworkflow';

        // 🔹 **Создаём список кнопок**
        const buttonsList = [
            new RedAppSidePanelButton('Show Banners', baseCssClassNames + '-banners', showBanners),
            new RedAppSidePanelButton('Test Workflow', 'btn btn-secondary', this.onTestWorkflowClick.bind(this)),
            new RedAppSidePanelButton('New Button', 'btn btn-primary', () => console.log('New Button Clicked!'))
        ];

        // Создаём конфигурацию для кнопок
        const config = new RedAppSidePanelConfig(buttonsList, 10);

        // Добавляем кнопки в правую панель
        getService(ExtensionPointService).addConfig('redAppSidePanel', config);
        console.log("✅ Buttons added to RedApp Side Panel");
    }

    // 🔹 **Метод, который открывает модальное окно**
    private onTestWorkflowClick(): void {
        console.log("Test Workflow button clicked! Opening modal...");
    
        // Проверяем, есть ли DrawerService
        const drawerService = getService(DrawerService);
        if (!drawerService) {
            console.error("❌ DrawerService not found!");
            return;
        }
    
        // Создаём конфигурацию модального окна
        const modalConfig = {
            title: 'Test Modal',
            maximized: false, // Обычное окно
            cssClass: 'test-modal',
            actions: [
                {
                    caption: 'CLOSE', // Кнопка закрытия
                    actionName: 'close',
                    type: 'secondary',
                    cssClass: 'btn',
                    className: 'app.common.views.Button'
                }
            ]
        };
    
        // Логируем перед созданием окна
        console.log("🔹 Creating LargeWidgetDrawerConfig...");
        
        try {
            // Создаём модальное окно
            const drawerConfig = new LargeWidgetDrawerConfig(SeatMapPanel, SeatMapModal, modalConfig);
            console.log("✅ LargeWidgetDrawerConfig created!");
    
            // Регистрируем модальное окно в DrawerService
            drawerService.addConfig(['test-modal'], drawerConfig);
            console.log("✅ Modal registered in DrawerService!");
        } catch (error) {
            console.error("❌ Error while creating or adding drawerConfig:", error);
        }
    }
}
