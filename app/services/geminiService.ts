
/**
 * Local Mock Service
 * All external AI dependencies have been removed.
 * This service now returns pre-defined 42-themed data.
 */

export const evaluateCode = async (code: string) => {
  // Simulate a short delay for "evaluation"
  await new Promise(r => setTimeout(r, 500));
  
  return [
    { phase: "lint", text: "Checking for 42 Header...", status: "success" },
    { phase: "lint", text: "flake8: line length (max 80) check...", status: "success" },
    { phase: "lint", text: "Forbidden imports check (pandas, numpy)...", status: "success" },
    { phase: "test", text: "Test 00: Standard array input", status: "success" },
    { phase: "test", text: "Test 01: Empty list handling", status: "success" },
    { phase: "test", text: "Test 02: Negative integer values", status: "success" },
    { phase: "test", text: "Test 03: String value types (Error handling)", status: "success" },
    { phase: "test", text: "Test 04: Memory usage efficiency", status: "success" }
  ];
};

export const simulateIntraData = async (username: string) => {
  return {
    login: "ft_student",
    level: 4.42,
    correction_points: 8,
    coalition: "Hive",
    campus: "Paris",
    image_url: "https://picsum.photos/seed/42/200/200"
  };
};

export const getDefenseReview = async (code: string, userQuery: string) => {
  // Mock peer response
  const responses = [
    "Your logic seems sound, but why did you choose this specific data structure?",
    "The Norm looks clean. Can you explain how you handle memory leaks in larger datasets?",
    "Interesting approach. I would have used a different sorting algorithm, but yours works.",
    "The way you handled the edge cases in Exercise 00 is quite Pythonic."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const editProfileImage = async (imageInput: string, prompt: string): Promise<string | null> => {
  // Static placeholder for removed AI image editing
  console.log("AI Image Editing is currently disabled in local mode.");
  return null;
};
