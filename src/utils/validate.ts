export const validateNumber = (value: string) => {
    // Kiểm tra nếu là một số
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "Giá trị phải là một số";
    }

    // Kiểm tra nếu số âm
    if (numberValue < 0) {
      return "Số không được âm";
    }

    return true; // Nếu không có lỗi
  };
    
export const validateImage =(value: FileList) => {
    if(Array.from(value).length > 5) {

        return 'Bạn chỉ có thể chọn tối đa 5 ảnh.'
    }
}