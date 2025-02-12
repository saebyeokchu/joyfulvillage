enum AuthError {
    'NotAuthorized' = '인증된 사용자가 아닙니다.'
}

enum ImageError {
    'confirmSelect' = '해당 이미지를 선택하시겠습니까?',
    'confirmAdd' = '해당 이미지를 추가하시겠습니까?'
}

enum GeneralError {
    'success' = '성공적으로 반영되었습니다.',
    'successfullySaved' = '성공적으로 저장되었습니다.',
    'successfullyDeleted' = '성공적으로 삭제되었습니다.',
    'unknownError' = '알 수 없는 오류가 발생하였습니다.',
    'tryLater' = '잠시후에 다시 시도해 주세요.',
    'unmatchedInfo' = '정보가 일치하지 않습니다.',
    'notValidInfo' = '유효한 정보가 아닙니다.',
    'verifyDeletion' = '을(를) 삭제하시겠습니까?',
    'fillTheAllTheForm' = '모든 정보를 입력하셔야 합니다.',
    'proceed' = '저장되지 않은 정보가 있습니다. 그대로 진행하시겠습니까?'
}

enum SoksoError {
    'noSoksoDetail' = '숙소 상세정보가 존재하지 않습니다.'
}

enum ProgramError {
    ''
}

export {
    AuthError,
    ImageError,
    GeneralError,
    SoksoError
}