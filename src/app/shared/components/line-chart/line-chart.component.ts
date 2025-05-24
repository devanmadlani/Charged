import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  private data = [
    { date: new Date(2025, 4), value: 84 },
    { date: new Date(2025, 6), value: 89 },
    { date: new Date(2025, 8), value: 87 },
    { date: new Date(2025, 11), value: 95 },
  ];

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;

    // Ionic theme variables
    const styles = getComputedStyle(document.body);
    const textColor =
      styles.getPropertyValue('--ion-text-color').trim() || '#000';
    const lineColor =
      styles.getPropertyValue('--ion-color-primary').trim() || '#3880ff';
    const axisLineColor = textColor;
    const horizontalLineColor = textColor;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 350 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Clear previous chart
    element.innerHTML = '';

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([80, 100]) // Can be changed to d3.extent if data is dynamic
      .range([height, 0]);

    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    const area = d3
      .area<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.value));

    // Gradient fill under the line
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', lineColor)
      .attr('stop-opacity', 0.3);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', lineColor)
      .attr('stop-opacity', 0);

    svg
      .append('path')
      .datum(this.data)
      .attr('d', area)
      .attr('fill', 'url(#line-gradient)');

    // X Axis
    const xAxis = d3
      .axisBottom(x)
      .ticks(4)
      .tickFormat(d3.timeFormat('%b') as any);
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    xAxisGroup.selectAll('text').style('fill', textColor);
    xAxisGroup
      .selectAll('path, line')
      .attr('stroke', axisLineColor)
      .attr('stroke-opacity', 0.4);

    // Y Axis
    const yAxis = d3.axisLeft(y).ticks(5);
    const yAxisGroup = svg.append('g').call(yAxis);

    yAxisGroup.selectAll('text').style('fill', textColor);
    yAxisGroup
      .selectAll('path, line')
      .attr('stroke', axisLineColor)
      .attr('stroke-opacity', 0.4);

    // X Axis Label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', textColor)
      .attr('font-size', '12px')
      .text('Month');

    // Y Axis Label
    svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', textColor)
      .attr('font-size', '12px')
      .text('Value');

    // Main line
    svg
      .append('path')
      .datum(this.data)
      .attr('d', line)
      .attr('stroke', lineColor)
      .attr('fill', 'none')
      .attr('stroke-width', 2);

    // horizontal lines
    const linesAt = y.ticks(5);
    linesAt.forEach((val) => {
      svg
        .append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(val))
        .attr('y2', y(val))
        .attr('stroke', horizontalLineColor)
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.4);
    });
  }
}
