
export function setTooltipParams(atts, params) {
  const tooltip = atts.tooltip
  if (tooltip) {
    params.tooltip = 'tooltip'
    params.tooltipIcon = '<span class="circle">?</span>'
    params.tooltipText = tooltip
  } else {
    params.tooltip = ''
    params.tooltipIcon = ''
    params.tooltipText = ''
  }
}
