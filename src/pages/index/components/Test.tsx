import React from "react"

export default class ImmutableComponentData extends React.Component {
  constructor() {
      super()
    this.state = {
      userInfo: {
        name: "Mayank",
        age: 30,
        designation: "Software Architect"
      }
    }
  }
  
  componentDidMount() {
      setTimeout(()=>{
          const { userInfo  } = this.state
          userInfo.name = "OtherUser"
        this.setState({
            userInfo
          })
      },3000)
      

      setInterval(()=>{
        console.log(this.state.userInfo)
      },3000)
    
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.userInfo != this.state.userInfo) {
      return true;
    }
  }
  
  render() {
    return <User userInfo = {this.state.userInfo}></User>
    
  }
}

class User extends React.Component{
    render() {
        return  <>
            <b>User Name: {this.props.userInfo.name}</b>
          </>
        
      }
}