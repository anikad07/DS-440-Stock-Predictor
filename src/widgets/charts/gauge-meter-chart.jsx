import React from 'react';
import {
  BarGauge, Label, Tooltip, Export, Title, Font, Legend,
} from 'devextreme-react/bar-gauge';


function customizeTooltip(arg) {
  return {
    text: getText(arg, arg.valueText),
  };
}
function customizeText(arg) {
  const labels = ["News", "Social Media"];
  return `${labels[arg.item.index]} : ${arg.text}`;

}
function getText(item, text) {
  return ` ${item.index + 1} : ${text} `;
}
export function GaugeMeter({ values }) {

  if (!values) return null;
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      
    <BarGauge
      id="gauge"
      startValue={-1}
      endValue={1}
      defaultValues={values}
      // whichever has higher value will be green, other red
      values={values}
      palette="Ocean"
      relativeInnerRadius={0.6}
    >
      <Label visible={false} />
      <Tooltip
        enabled={true}
        customizeTooltip={customizeTooltip}
      />
      <Export enabled={true} />
      <Title text="Correlation between Stock Price & Sentiment">
        <Font size={20} />
      </Title>
      <Legend
        visible={true}
        customizeText={customizeText}
        verticalAlignment="center"
        horizontalAlignment="center"
      />
    </BarGauge>
  </div>
  );
}
export default GaugeMeter;