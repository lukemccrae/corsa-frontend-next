// TODO: better types in this file

export const evaluateExpandedItem = (props: any) => {
  if (props.expandedItem !== "") {
    if (props.expandedItem === props.id) return "flex";
    return "none";
  } else {
    return "flex";
  }
};

export const toggleExpand = (
  id: string,
  setExpanded: Function,
  expanded: Boolean,
  props: any
) => {
  setExpanded(!expanded);
  if (props.expandedItem) {
    props.setExpandedItem("");
  } else {
    props.setExpandedItem(id);
  }
};

export const amIExpanded = (props: any) => {
  return props.expandedItem === props.id;
};
