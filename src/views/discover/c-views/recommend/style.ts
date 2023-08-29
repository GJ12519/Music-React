import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    border-bottom: none;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;
    padding-bottom: 20px;

    > .left {
      /* border: 1px solid red; */
      padding: 20px;
      width: 690px;
    }

    > .right {
      /* border: 1px solid red; */
      margin-left: 2px;
      width: 250px;
    }
  }
`
