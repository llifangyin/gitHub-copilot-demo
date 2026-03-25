/**
 * 格式化日期对象为字符串
 * @param date - 待格式化的日期对象
 * @returns 格式化后的日期字符串，格式为 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date: Date): string {
    try {
        const year: number = date.getFullYear();
        const month: string = String(date.getMonth() + 1).padStart(2, '0');
        const day: string = String(date.getDate()).padStart(2, '0');
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');
        const seconds: string = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        throw new Error(`日期格式化失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}
/**
 * 获取用户数据
 * @returns 用户数据对象
 * @throws 请求失败或数据解析异常时抛出错误
 */
export function fetchUserData(): Promise<Record<string, unknown>> {
    return fetch('https://api.example.com/user/1')
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error: unknown) => {
            throw new Error(`获取用户数据失败: ${error instanceof Error ? error.message : '未知错误'}`);
        });
}
/**
 * 计算两个数之和
 * @param a - 第一个加数
 * @param b - 第二个加数
 * @returns 两数之和
 */
export function calculateSum(a: number, b: number): number {
    return a +     b;
}

/**
 * 统计字符串中出现次数最多的字符
 * @param str - 待统计的字符串
 * @returns 包含出现次数最多的字符及其数量的对象
 * @throws 传入空字符串时抛出错误
 */
export function getMostFrequentChar(str: string): { char: string; count: number } {
    try {
        if (str.length === 0) {
            throw new Error('输入字符串不能为空');
        }

        const freqMap = new Map<string, number>();
        for (const ch of str) {
            freqMap.set(ch, (freqMap.get(ch) ?? 0) + 1);
        }

        let maxChar = '';
        let maxCount = 0;
        for (const [ch, count] of freqMap) {
            if (count > maxCount) {
                maxChar = ch;
                maxCount = count;
            }
        }

        return { char: maxChar, count: maxCount };
    } catch (error) {
        throw new Error(`字符统计失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}