export const HandleFormSubmit = (values, {setSubmitting}) => {
	setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 400);
};
