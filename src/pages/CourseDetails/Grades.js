import SetGradesButton from "./SetGradesButton";

export const Grades = [
  {
    id: 1,
    name: "walaa",
    grade: 282,
    button: <SetGradesButton />,
  },

  {
    id: 2,
    name: "Ruba",
    grade: 97,
    button: <SetGradesButton />,
  },

  {
    id: 3,
    name: "aya",
    grade: 99,
    button: <SetGradesButton />,
  },
];

export function getGrades() {
  return Grades;
}
