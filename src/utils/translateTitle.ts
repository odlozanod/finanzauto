export function translateTitle(title?: string): string {
  switch (title) {
    case 'mr':
      return 'Sr.';
    case 'mrs':
      return 'Sra.';
    case 'ms':
      return 'Srta.';
    default:
      return '';
  }
}
