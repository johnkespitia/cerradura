import React, { useState } from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'

const PopoverWrapper =( props) =>{
  const [show, setShow] = useState(false)
  const handlePopoverClose = () => {
    setShow(false);
  };
  const toggleShow = () => {
    setShow(!show)
  };
  return <>
    <OverlayTrigger
      trigger="click"
      key={'right'}
      placement={"right"}
      show={show}
      onToggle={setShow}
      rootClose={true}
      onHide={handlePopoverClose}
      overlay={
        <Popover id={`popover-positioned-right`}>
          <Popover.Header as="h3">{props.title}</Popover.Header>
          <Popover.Body>
            {React.Children.map(props.children, (child) => {
              return React.cloneElement(child, { setShow: setShow });
            })}
          </Popover.Body>
        </Popover>
      }
    >
      <Button size={"sm"} variant={"success"} style={{borderRadius:"1rem" }} onClick={toggleShow} >{props.caller}</Button>
    </OverlayTrigger>
  </>
}
export default PopoverWrapper
