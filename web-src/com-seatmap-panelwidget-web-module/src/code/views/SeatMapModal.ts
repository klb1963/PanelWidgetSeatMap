import { Template } from 'sabre-ngv-core/decorators/classes/view/Template';
import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { FlightSegment } from "sabre-ngv-app/app/common/data/flight/FlightSegment";
import { AbstractViewOptions } from "sabre-ngv-app/app/AbstractViewOptions";

/**
 * Модальное окно для выбора мест в самолёте.
 */
@Template('panelwidget-seatmap:SeatMapModal')
export class SeatMapModal extends AbstractView<FlightSegment> {

    /**
     * Конструктор - задаёт события DOM.
     */
    constructor(options?: AbstractViewOptions) {
        super(options);
        this.addDomEvents({
            'click .seat': 'selectSeat', // Обработчик клика по месту
            'click #confirm-seat-selection': 'confirmSeatSelection' // Подтверждение выбора
        });
    }

    /**
     * Метод вызывается при передаче данных о рейсе в виджет.
     * @param flightSeg - объект с информацией о сегменте рейса.
     */
    selfDrawerContextModelPropagated(flightSeg: FlightSegment) {
        console.log("Flight Segment received:", flightSeg);

        // Сохраняем информацию о рейсе в модели
        this.getModel().set('flightSegment', flightSeg);

        // Перерисовываем UI
        this.render();
    }

     /**
     * Обрабатывает выбор места.
     * @param event - объект события (jQuery)
     */
     private selectSeat(event: JQueryEventObject): void {
        let selectedSeat = this.$(event.currentTarget).data('seat');

        console.log(`Seat selected: ${selectedSeat}`);
        
        // Сохраняем выбор пользователя в модели
        this.getModel().set('selectedSeat', selectedSeat);

        // Визуально выделяем выбранное место
        this.$('.seat').removeClass('selected');
        this.$(event.currentTarget).addClass('selected');

        // Обновляем отображение в HTML
        this.$('#selected-seat').text(selectedSeat);
    }

    /**
    * Подтверждает выбор места и отправляет данные.
    */
    private confirmSeatSelection(): void {
        let selectedSeat = this.getModel().get('selectedSeat');

        if (!selectedSeat) {
            alert("Please select a seat before confirming.");
            return;
        }

        console.log(`Confirmed seat: ${selectedSeat}`);

        // Отправляем данные о выбранном месте
        this.trigger('seatSelected', { seat: selectedSeat });

        // Закрываем модальное окно
        this.trigger('close'); 
    }
}