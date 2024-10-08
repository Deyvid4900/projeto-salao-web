const styles = {
  spinnerContainer: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    position: 'absolute' as 'absolute',
    top: '50%' as '50%',
    left: '50%' as '50%',
    transform: 'translate(-50%, -50%)' as 'translate(-50%, -50%)',
    width: '100%' as '100%',
    height: '100%' as '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)' as 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000 as 1000,
    visibility: 'hidden' as 'hidden',
    opacity: 0 as 0,
    transition: 'visibility 0s, opacity 0.5s linear' as 'visibility 0s, opacity 0.5s linear'
  },
  spinnerContainerActive: {
    visibility: 'visible' as 'visible',
    opacity: 1 as 1
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#FF5B5B",
    margin: 0,
    padding: 0,
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center" as "center",
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#666",
    textAlign: "center" as "center", // Correct usage
    marginBottom: "1.5rem",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  checkboxLabel: {
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  divider: {
    margin: "1.5rem 0",
    border: "none",
    borderBottom: "1px solid #ccc",
  },
  socialButton: {
    width: "100%",
    padding: "0.75rem",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  facebookButton: {
    backgroundColor: "#3B5998",
  },
  icon: {
    marginRight: "0.5rem",
    fontSize: "1.25rem",
  },
};

export default styles;
