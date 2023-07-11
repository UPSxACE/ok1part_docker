export default function getReasonLabel(reason: string) {
  // FIXME - Actually, this will be fetched from database on the production version

  switch (reason) {
    case 'change-shift-id':
      return 'Change of Shift';
    case 'different-model-id':
      return 'Different Model';
    default:
      return reason;
  }
}
