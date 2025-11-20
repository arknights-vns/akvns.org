import * as z from "zod";

// Kahoot-at-home answer schemas

// Boolean answers: just true/false
export const BoolAnswer = z.object({
    answer: z.boolean({}),
});

// Slider answers: answers must be in the upper and lower limit

export const SliderAnswer = z.object({
    lowerLimit: z.number({}),
    upperLimit: z.number({}),
});

// Image region answers: answer must be in an area defined by a diagonal pos1/pos2 (WorldEdit-style)
// note: pos1 and pos2 are [x, y]
export const ImgRegionAnswer = z.object({
    image: z.httpUrl(),
    pos1: [z.number(), z.number()],
    pos2: [z.number(), z.number()],
});

// Multi-choice answer: self-explanatory
export const MultiChoiceAnswer = z.object({
    answerIndex: z.number({}),
    responses: z.array(z.string()),
});
