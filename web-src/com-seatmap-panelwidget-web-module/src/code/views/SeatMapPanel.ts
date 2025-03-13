import { Tile } from "sabre-ngv-app/app/widgets/drawer/views/elements/Tile";
import { TileOptions } from "sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions";
import { Initial } from 'sabre-ngv-core/decorators/classes/Initial';
import { FlightSegment } from "sabre-ngv-app/app/common/data/flight/FlightSegment";

/**
 * Плитка (Tile) для отображения карты мест (SeatMap).
 */
@Initial<TileOptions>({
    caption: 'ABC Seat Map' // Заголовок плитки
})

export class SeatMapPanel extends Tile<FlightSegment> {

     /**
     * Конструктор класса.
     * Добавляет лог в консоль, чтобы проверить загрузку.
     */
     constructor() {
        super();
        console.log("✅ SeatMapPanel initialized");
    }


    /**
     * Метод вызывается при передаче данных о сегменте рейса в виджет.
     * @param flightSeg - объект с информацией о сегменте рейса.
     */
    selfDrawerContextModelPropagated(flightSeg: FlightSegment) {
        console.log("Flight Segment received in SeatMapPanel:", flightSeg);

        // Основной текст кнопки
        var buttonText = "SELECT SEAT";

        // Текст футера (если нужен)
        var footerText = "Choose a seat for your flight";

        // Устанавливаем контент плитки
        this.setDataContent({
            contents: [{
                content: buttonText
            }],
            footer: footerText
        });

        // Добавляем обработчик клика на плитку
        this.on('click', () => {
            console.log("Seat Map Tile clicked");
            this.trigger('openSeatMap', { flightSeg }); // Открытие модального окна с SeatMap
        });
    }
}