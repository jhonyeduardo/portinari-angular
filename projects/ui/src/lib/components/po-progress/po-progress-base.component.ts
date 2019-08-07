import { EventEmitter, Input, Output } from '@angular/core';

import { convertToBoolean, convertToInt } from '../../utils/util';

import { PoProgressStatus } from './enums/po-progress-status.enum';

const poProgressMaxValue = 100;
const poProgressMinValue = 0;

/**
 * @description
 *
 * Componente de barra de progresso para poder mostrar o progresso/carregamento de uma tarefa.
 *
 * Este componente pode ser utilizado no *upload* de um arquivo, uma atualização no sistema ou o processamento de uma imagem.
 */
export class PoProgressBaseComponent {

  private _indeterminate?: boolean;
  private _value?: number;

  /**
   * @optional
   *
   * @description
   *
   * Habilita o modo indeterminado na barra de progresso, que mostra uma animação fixa sem um valor estabelecido.
   *
   * Esta opção pode ser utilizada quando não souber quanto tempo levará para que um processo seja concluído.
   *
   * > Caso esta propriedade e a `p-value` seja habilitada, a propriedade `p-value` será ignorada.
   *
   * @default `false`
   */
  @Input('p-indeterminate') set indeterminate(indeterminate: boolean) {
    this._indeterminate = convertToBoolean(indeterminate);
  }

  get indeterminate(): boolean {
    return this._indeterminate;
  }

  /**
   * @optional
   *
   * @description
   *
   * Informação adicional que aparecerá abaixo da barra de progresso do lado direito.
   */
  @Input('p-info') info?: string;

  /**
   * @optional
   *
   * @description
   *
   * Ícone que aparecerá ao lado do texto da propriedade `p-info`.
   *
   * Exemplo: `po-icon-ok`.
   */
  @Input('p-info-icon') infoIcon?: string;

  /**
   * @optional
   *
   * @description
   *
   * Status da barra de progresso que indicará visualmente ao usuário
   * o andamento, por exemplo, se a mesma foi concluída com sucesso.
   *
   * @default `PoProgressBarStatus.Default`
   */
  @Input('p-status') status: PoProgressStatus = PoProgressStatus.Default;

  /**
   * @optional
   *
   * @description
   *
   * Texto principal que aparecerá abaixo da barra de progresso no lado esquerdo.
   */
  @Input('p-text') text?: string;

  /**
   * @optional
   *
   * @description
   *
   * Valor que representará o progresso.
   *
   * Os valores aceitos são números inteiros de 0 à 100.
   *
   * @default `0`
   */
  @Input('p-value') set value(value: number) {
    const integerValue = convertToInt(value, poProgressMinValue);
    const isProgressRangeValue = this.isProgressRangeValue(integerValue);

    this._value = isProgressRangeValue ? integerValue : poProgressMinValue;
  }

  get value() {
    return this._value;
  }

  /**
   * @optional
   *
   * @description
   *
   * Evento que será disparado ao clicar no ícone de cancelamento ("x") na parte inferior.
   *
   * Ao ser disparado, a função receberá como parâmetro o status atual da barra de progresso.
   *
   * > Se nenhuma função for passada para o evento, o ícone de cancelamento não será exibido.
   */
  @Output('p-cancel') cancel: EventEmitter<any> = new EventEmitter();

  emitCancellation() {
    this.cancel.emit(this.status);
  }

  isCancel(): boolean {
    return !!this.cancel.observers.length;
  }

  isProgressRangeValue(value: number): boolean {
    return value >= poProgressMinValue && value <= poProgressMaxValue;
  }

}
