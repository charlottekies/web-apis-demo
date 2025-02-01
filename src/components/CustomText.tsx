type CustomTextProps = {
    text: string;
    size: "sm" | "md" | "lg";
    truncateLength: number
}

const CustomText = (props: CustomTextProps) => {
    return <>
        <span className={`text-${props.size}`}></span>
    </>
}