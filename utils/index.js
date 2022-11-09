exports.randomString = async (length, customCharacter) => {
  const { customAlphabet } = await import("nanoid");
  const character = customCharacter ?? "0123456789";
  const nanoId = customAlphabet(character, 10);
  return nanoId(length);
};
