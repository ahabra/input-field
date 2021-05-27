export const template = `
{cssFile}

<div class="input-field">
  <label class="label">
    <span class="superlabel {required} {tooltip}">
      {label} {tooltipIcon}
      <span class="tooltip-text">{tooltipText}</span>
    </span>
    <span class="sublabel">{sublabel}</span>
  </label>

  {input}

  <footer>
    <ul class="rules" style="display:{showrules};">{rules}</ul>
  </footer>
</div>
`