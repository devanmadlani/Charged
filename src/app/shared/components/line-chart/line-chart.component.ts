import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  HostListener,
} from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * Interface for chart data points
 */
interface ChartDataPoint {
  date: Date;
  value: number;
}

/**
 * Interface for chart configuration
 */
interface ChartConfig {
  margin: { top: number; right: number; bottom: number; left: number };
  minValue: number;
  maxValue: number;
  ticks: number;
  strokeWidth: number;
}

/**
 * Responsive line chart component with gradient fill
 * Displays time-series data with smooth line visualization
 */
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  /**
   * Chart data input - defaults to sample data if not provided
   */
  @Input() data: ChartDataPoint[] = [
    { date: new Date(2025, 4), value: 84 },
    { date: new Date(2025, 6), value: 89 },
    { date: new Date(2025, 8), value: 87 },
    { date: new Date(2025, 11), value: 95 },
  ];

  /**
   * Chart configuration input - allows customization of chart appearance
   */
  @Input() config: Partial<ChartConfig> = {};

  private readonly destroy$ = new Subject<void>();
  private readonly resize$ = new Subject<void>();
  private svg: d3.Selection<SVGGElement, unknown, null, undefined> | null =
    null;
  private resizeObserver: ResizeObserver | null = null;

  /**
   * Default chart configuration
   */
  private readonly defaultConfig: ChartConfig = {
    margin: { top: 20, right: 20, bottom: 50, left: 50 },
    minValue: 80,
    maxValue: 100,
    ticks: 5,
    strokeWidth: 2,
  };

  ngAfterViewInit(): void {
    this.setupResizeHandler();
    this.setupResizeObserver();
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      this.createChart();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupResizeObserver();
  }

  /**
   * Handle window resize events for responsive behavior
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this.resize$.next();
  }

  /**
   * Setup resize handler with debouncing to prevent excessive chart redraws
   */
  private setupResizeHandler(): void {
    this.resize$
      .pipe(debounceTime(150), takeUntil(this.destroy$))
      .subscribe(() => {
        this.createChart();
      });
  }

  /**
   * Setup ResizeObserver for more accurate dimension detection
   */
  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined' && this.chartContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.resize$.next();
      });
      this.resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  /**
   * Cleanup ResizeObserver to prevent memory leaks
   */
  private cleanupResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Get the merged configuration combining default and input config
   */
  private getConfig(): ChartConfig {
    return { ...this.defaultConfig, ...this.config };
  }

  /**
   * Get responsive dimensions based on container size
   */
  private getDimensions(): { width: number; height: number } {
    const element = this.chartContainer.nativeElement;
    const parentElement = element.parentElement;

    // Try to get dimensions from the element itself first
    let containerWidth = element.clientWidth;
    let containerHeight = element.clientHeight;

    // If container dimensions are not available, try parent element
    if ((containerWidth === 0 || containerWidth < 100) && parentElement) {
      containerWidth = parentElement.clientWidth;
    }
    if ((containerHeight === 0 || containerHeight < 100) && parentElement) {
      containerHeight = parentElement.clientHeight;
    }

    // Final fallback to default dimensions
    containerWidth = containerWidth || 350;
    containerHeight = containerHeight || 200;

    const config = this.getConfig();

    return {
      width: Math.max(
        containerWidth - config.margin.left - config.margin.right,
        100
      ),
      height: Math.max(
        containerHeight - config.margin.top - config.margin.bottom,
        100
      ),
    };
  }

  /**
   * Create and render the responsive line chart
   */
  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    if (!element || !this.data.length) return;

    const config = this.getConfig();
    const { width, height } = this.getDimensions();

    // Skip rendering if dimensions are too small
    if (width <= 0 || height <= 0) return;

    // Get Ionic theme variables
    const styles = getComputedStyle(document.body);
    const textColor =
      styles.getPropertyValue('--ion-text-color').trim() || '#000';
    const lineColor =
      styles.getPropertyValue('--ion-color-primary').trim() || '#3880ff';
    const axisLineColor = textColor;
    const horizontalLineColor = textColor;

    // Clear previous chart
    element.innerHTML = '';

    // Create SVG with responsive dimensions
    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + config.margin.left + config.margin.right)
      .attr('height', height + config.margin.top + config.margin.bottom)
      .append('g')
      .attr(
        'transform',
        `translate(${config.margin.left},${config.margin.top})`
      );

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([config.minValue, config.maxValue])
      .range([height, 0]);

    // Create line and area generators
    const line = d3
      .line<ChartDataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    const area = d3
      .area<ChartDataPoint>()
      .x((d) => xScale(d.date))
      .y0(height)
      .y1((d) => yScale(d.value));

    this.createGradient(lineColor);
    this.renderArea(area);
    this.renderAxes(
      xScale,
      yScale,
      width,
      height,
      textColor,
      axisLineColor,
      config
    );
    this.renderAxisLabels(width, height, config, textColor);
    this.renderLine(line, lineColor, config);
    this.renderHorizontalLines(
      yScale,
      width,
      height,
      horizontalLineColor,
      config
    );
  }

  /**
   * Create gradient definition for area fill
   */
  private createGradient(lineColor: string): void {
    if (!this.svg) return;

    const defs = this.svg.append('defs');
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
  }

  /**
   * Render the area under the line
   */
  private renderArea(area: d3.Area<ChartDataPoint>): void {
    if (!this.svg) return;

    this.svg
      .append('path')
      .datum(this.data)
      .attr('d', area)
      .attr('fill', 'url(#line-gradient)');
  }

  /**
   * Render X and Y axes
   */
  private renderAxes(
    xScale: d3.ScaleTime<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number,
    textColor: string,
    axisLineColor: string,
    config: ChartConfig
  ): void {
    if (!this.svg) return;

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(4)
      .tickFormat(d3.timeFormat('%b') as any);

    const xAxisGroup = this.svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    xAxisGroup.selectAll('text').style('fill', textColor);
    xAxisGroup
      .selectAll('path, line')
      .attr('stroke', axisLineColor)
      .attr('stroke-opacity', 0.4);

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(config.ticks);
    const yAxisGroup = this.svg.append('g').call(yAxis);

    yAxisGroup.selectAll('text').style('fill', textColor);
    // Hide the main Y-axis line but keep tick marks
    yAxisGroup.select('.domain').style('display', 'none');
    yAxisGroup
      .selectAll('line')
      .attr('stroke', axisLineColor)
      .attr('stroke-opacity', 0.4);
  }

  /**
   * Render axis labels
   */
  private renderAxisLabels(
    width: number,
    height: number,
    config: ChartConfig,
    textColor: string
  ): void {
    if (!this.svg) return;

    // X Axis Label
    this.svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + config.margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', textColor)
      .attr('font-size', '12px')
      .text('Month');

    // Y Axis Label
    this.svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -config.margin.left + 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', textColor)
      .attr('font-size', '12px')
      .text('Value');
  }

  /**
   * Render the main line
   */
  private renderLine(
    line: d3.Line<ChartDataPoint>,
    lineColor: string,
    config: ChartConfig
  ): void {
    if (!this.svg) return;

    this.svg
      .append('path')
      .datum(this.data)
      .attr('d', line)
      .attr('stroke', lineColor)
      .attr('fill', 'none')
      .attr('stroke-width', config.strokeWidth);
  }

  /**
   * Render horizontal grid lines
   */
  private renderHorizontalLines(
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number,
    horizontalLineColor: string,
    config: ChartConfig
  ): void {
    if (!this.svg) return;

    const linesAt = yScale.ticks(config.ticks);
    linesAt.forEach((val) => {
      this.svg!.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', yScale(val))
        .attr('y2', yScale(val))
        .attr('stroke', horizontalLineColor)
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.4);
    });
  }
}
