import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberAbbreviator",
  standalone: true,
})
export class NumberAbbreviatorPipe implements PipeTransform {
  //método que devolve valores acima de mil e milhão já convertido
  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return "0";
    }

    if (value >= 1000000) {
      const millions = value / 1000000;
      return millions.toFixed(1).replace(/\.0$/, "") + "M";
    }

    if (value >= 1000) {
      const thousands = Math.floor(value / 1000);
      return thousands + "k";
    }

    return value.toString();
  }
}
