import styled from 'styled-components'

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: 500;
    span {
        width: 100%;
        text-align: center;
    }
    &::before {
        background: #77777739;
        content: '';
        display: block;
        height: 1px;
        width: 100%;
    }
    &::after {
        background: #77777739;
        content: '';
        display: block;
        height: 1px;
        width: 100%;
    }
`

const BorderedText = ({ children, ...props }: IBorderedText) => {
    return (
        <Title {...props}>
            <span>{children}</span>
        </Title>
    )
}

interface IBorderedText {
    children: string
	[prop: string]: any
}

export default BorderedText
