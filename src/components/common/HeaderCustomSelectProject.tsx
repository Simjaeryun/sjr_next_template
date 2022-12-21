/* eslint-disable no-use-before-define */
import { useTheme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Select, { Props as ReactSelectProps } from "react-select";

interface CustomSelectProps {
	chooseType?: any;
	optionsList?: any[];
	selectedValue?: string;
}

const HeaderCustomSelectProject = ({
	chooseType,
	optionsList,
	selectedValue,
	...props
}: CustomSelectProps & ReactSelectProps) => {
	const theme = useTheme();
	const handleChange = (e: any) => {
		chooseType(e);
	};

	const options = optionsList ?? [];

	const CustomSelectStyle = {
		control: (base: any, state: any) => ({
			...base,
			borderRadius: "8px",
			background: "#FFFFFF0D",
			border: "1px solid #FFFFFF4D",
			width: "200px",
			height: "40px",
		}),
		dropdownIndicator: (base: any) => ({
			...base,
			color: "white",
		}),
		input: (base: any) => ({
			...base,
			color: "white",
			fontWeight: "700",
			fontSize: "16px",
			lineHeight: "20px",
			letterSpacing: "0.02em",
		}),

		singleValue: (base: any) => ({
			...base,
			color: "white",
			fontWeight: "700",
			fontSize: "16px",
			lineHeight: "20px",
			letterSpacing: "0.02em",
		}),
		placeholderIndicator: (base: any) => ({
			...base,
			color: "white",
			fontWeight: "700",
			fontSize: "16px",
			lineHeight: "20px",
			letterSpacing: "0.02em",
		}),
		indicatorSeparator: (base: any) => ({
			...base,
			display: "none",
		}),
	};

	return (
		<Wrap className="headerCustomSelect">
			<Select
				instanceId="select"
				onChange={handleChange}
				options={options}
				//selectOption={selectRow}
				value={options.find((op) => {
					// choice state에 따라 디폴트 option 세팅
					return op.value === selectedValue;
				})}
				styles={CustomSelectStyle}
			/>
		</Wrap>
	);
};

export default HeaderCustomSelectProject;

interface WrapStyleProps {
	width?: string;
}

const Wrap = styled.div<WrapStyleProps>`
	width: ${({ width }) => (width ? width : "100%")};
`;

const StyledReactSelect = styled(Select)<{ customTheme: any }>`
	svg {
		width: 24px;
		height: 24px;
		color: ${(props) => props.customTheme.colors.gray[600]};
	}

	& .Select {
		&__control {
			display: flex;
			align-items: center;
			background-color: ${(props) => props.customTheme.colors.gray[50]};
			border-color: ${(props) => props.customTheme.colors.gray[400]};
			height: 50;
			border-radius: 10px;
			box-shadow: none !important;
		}

		&__menu {
			margin: 0;
			top: calc(100% - 2px);
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			overflow: hidden;
			box-shadow: "none";
			border-width: 0px;
			background-color: ${(props) => props.customTheme.colors.gray[50]};
			color: ${(props) => props.customTheme.colors.white};
			&-list {
				padding: 0;
				border-top-width: 1px;
				border-top-color: ${(props) => props.customTheme.colors.gray[400]};
			}
		}

		&__option {
			height: 50;
			display: "flex";
			align-items: "center";
			font-weight: bold;
			&--is-selected {
				background-color: ${(props) => props.customTheme.colors.gray[50]};
			}
			&--is-focused {
				background-color: ${(props) => props.customTheme.colors.gray[50]};
			}
		}

		&__value-container {
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 16px;
		}
		&__single-value {
			color: ${(props) => props.customTheme.colors.white};
			font-weight: bold;
			opacity: 1;
			transition: opacity 300ms;
			&--is-disabled {
				opacity: 0;
			}
		}

		&__placeholder {
			color: ${(props) => props.customTheme.colors.gray[600]};
			font-weight: normal;
		}

		&__indicator {
			&-separator {
				display: none;
			}
		}
	}
`;
