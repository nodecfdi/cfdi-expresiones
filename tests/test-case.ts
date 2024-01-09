import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const useTestCase = (): {
  filePath: (append?: string) => string;
  fileContent: (path: string) => string;
  fileContentPath: (append: string) => string;
} => {
  const filePath = (append = ''): string => join(dirname(fileURLToPath(import.meta.url)), '_files', append);

  const fileContent = (path: string): string => {
    if (!existsSync(path)) {
      return '';
    }

    return readFileSync(path).toString();
  };

  const fileContentPath = (append: string): string => fileContent(filePath(append));

  return {
    filePath,
    fileContent,
    fileContentPath,
  };
};

export { useTestCase };
