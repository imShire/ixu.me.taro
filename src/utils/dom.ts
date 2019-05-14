
export function filterHtmlTags(str: string): string {
  return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}
