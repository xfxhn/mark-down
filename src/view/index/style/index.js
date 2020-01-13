import styled from 'styled-components'

export const Box = styled.div`
 
  display: flex;
  justify-content: space-between;
`;

export const LeftBox = styled.div`
  
  width: 40%;
  min-width: 20%;
`;

export const RightBox = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  .editor{
    height: 100vh;
    background: red;
  }
`;

export const Editor = styled.ul`
    display: ${props => props.block};
    position: absolute;
    left: ${props => props.x}px;
    top: ${props => props.y}px;
    background: #ccc;
    z-index: 99;
    li{
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        :hover{
          background: red;
        }
    }
    
`;

export const TabBox = styled.ul`
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    .current{
      background: #ccc;
    }
    li{
      height: 100%;
      padding:0 30px;
      margin-right: 5px;
      position:relative;
      i{
        display: none;
        font-size: 20px;
        height: 100%;
        position:absolute;
        top: 0;
        right: 5px;
        cursor: pointer;
      }
      :hover{
          i{
            display: block;
          }
          
       }
    }
`;

export const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 80px;
`;

export const ListBox = styled.div`
    padding-left: 10px;
    .show{
      display: block;
    }
    .close{
      display: none;
    }
    
    .container{
        display: flex;
        align-items: center;
        padding: 5px 0;
        position:relative;
        cursor:pointer;
        .arrow{
          position:absolute;
          right: 10px;
          
        }
    }
`;

export const SelectInput = styled.div`
    height: 80vh;  
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
`;
