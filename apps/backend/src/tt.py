import string

def solution(x):
    # Your code here
    # Construct a translation table
    original = 'abcdefghijklmnopqrstuvwxyz'
    replaced = original[::-1]

    # Build a new string with replacements
    result = []
    for char in x:
        if char in original:
            index = original.index(char)
            result.append(replaced[index])
        else:
            result.append(char)

    return ''.join(result)

print(solution("wrw blf hvv ozhg mrtsg'h vkrhlwv?"))


print(solution("\"vmxibkgrlm\"") == "\"encryption\"")
print(solution("wrw blf hvv ozhg mrtsg'h vkrhlwv?") == "did you see last night's episode?")
print(solution("Yvzs! I xzm'g yvorvev Lzmxv olhg srh qly zg gsv xlolmb!!") == "Yeah! I can't believe Lance lost his job at the colony!!")

