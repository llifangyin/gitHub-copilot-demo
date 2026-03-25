import { describe, it, expect } from '@jest/globals';
import { formatDate } from './utils';

/**
 * 测试套件：formatDate
 * @description 验证日期格式化函数在各种输入情况下的输出正确性
 */
describe('formatDate', () => {

  /**
   * 正常输入：典型日期对象，验证输出格式和内容
   */
  describe('正常输入', () => {

    /**
     * 验证标准日期能被正确格式化为 YYYY-MM-DD HH:mm:ss
     */
    it('应将标准日期格式化为正确的字符串', () => {
      const date = new Date(2026, 2, 25, 14, 5, 9); // 2026-03-25 14:05:09
      const result = formatDate(date);
      expect(result).toBe('2026-03-25 14:05:09');
    });

    /**
     * 验证月份和日期的补零行为
     */
    it('月份和日期应补零至两位', () => {
      const date = new Date(2026, 0, 1, 0, 0, 0); // 2026-01-01 00:00:00
      const result = formatDate(date);
      expect(result).toBe('2026-01-01 00:00:00');
    });

    /**
     * 验证时分秒均正确格式化
     */
    it('时分秒应补零至两位', () => {
      const date = new Date(2026, 11, 31, 9, 8, 7); // 2026-12-31 09:08:07
      const result = formatDate(date);
      expect(result).toBe('2026-12-31 09:08:07');
    });

  });

  /**
   * 边界值：极端或特殊日期，验证边界行为
   */
  describe('边界值', () => {

    /**
     * 验证 Unix 纪元起点（时间戳为 0）的格式化结果
     */
    it('应正确处理 Unix 纪元起点 (1970-01-01)', () => {
      const date = new Date(0); // UTC 1970-01-01 00:00:00，本地时间因时区而异
      const result = formatDate(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    /**
     * 验证年末最后一刻的格式化结果
     */
    it('应正确处理年末最后一秒 (12月31日 23:59:59)', () => {
      const date = new Date(2026, 11, 31, 23, 59, 59);
      const result = formatDate(date);
      expect(result).toBe('2026-12-31 23:59:59');
    });

    /**
     * 验证闰年 2 月 29 日能被正确处理
     */
    it('应正确处理闰年的 2 月 29 日', () => {
      const date = new Date(2028, 1, 29, 12, 0, 0); // 2028 是闰年
      const result = formatDate(date);
      expect(result).toBe('2028-02-29 12:00:00');
    });

  });

  /**
   * 非法输入：无效日期对象，验证错误抛出行为
   */
  describe('非法输入', () => {

    /**
     * 验证传入 Invalid Date 时抛出 Error
     */
    it('传入 Invalid Date 时应抛出 Error', () => {
      const invalidDate = new Date('not-a-date');
      try {
        formatDate(invalidDate);
        throw new Error('应当抛出错误，但未抛出');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('日期格式化失败');
      }
    });

  });

});
