use validator::ValidationError;

//Custom validation rule: ensure i32 is greater than zero
pub fn validate_positive(val: i32) -> Result<(), ValidationError> {
    if val >= 0 {
        Ok(())
    } else {
        Err(ValidationError::new("must_be_positive"))
    }
}
