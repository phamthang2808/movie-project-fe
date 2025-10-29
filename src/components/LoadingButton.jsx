import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import "./LoadingButton.scss";

/**
 * LoadingButton Component
 * Button với loading spinner tích hợp
 */
const LoadingButton = ({
    children,
    loading = false,
    disabled = false,
    onClick,
    type = "button",
    className = "",
    variant = "primary", // primary, secondary, outline, danger
    size = "medium", // small, medium, large
    icon = null,
    fullWidth = false,
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            className={`loading-btn ${variant} ${size} ${className} ${
                fullWidth ? "full-width" : ""
            } ${isDisabled ? "disabled" : ""}`}
            onClick={onClick}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="spinner" size={16} />
                    <span>Đang xử lý...</span>
                </>
            ) : (
                <>
                    {icon && <span className="btn-icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

LoadingButton.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    icon: PropTypes.node,
    fullWidth: PropTypes.bool,
};

export default LoadingButton;

