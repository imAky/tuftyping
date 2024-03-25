import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";

const generateWords = (count: number) => {
  return faker.random.words(count).toLowerCase();
  // return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in massa risus. Nullam orci augue, feugiat vel magna congue, ultrices ornare risus. Aliquam non commodo turpis, eu lobortis justo. Cras viverra ullamcorper consectetur. Donec ipsum dolor, vulputate sit amet semper a, sagittis vel libero.";
};

const useWords = (count: number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
};

export default useWords;
