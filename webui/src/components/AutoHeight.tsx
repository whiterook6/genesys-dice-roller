import { Component, ComponentChildren, createRef } from "preact";

interface Props {
  children: ComponentChildren;
}

interface State {
  height: number;
}

export class AutoHeight extends Component<Props, State> {
  private contentRef = createRef();

  public state: State = {
    height: 0
  };

  public componentDidMount(): void {
    this.onResize();
  }

  public componentDidUpdate(): void {
    this.onResize();
  }
  
  public onResize(){
    if (!this.contentRef.current){
      return;
    }
    
    const desiredHeight = this.contentRef.current.clientHeight;
    if (Math.abs(desiredHeight - this.state.height) >= 1) {
      this.setState({
        height: desiredHeight
      });
    }
  }

  public render() {
    return (
      <div style={{
        transition: "height 100ms ease-in-out",
        height: `${this.state.height}px`,
        overflow:"hidden"
      }}>
        <div ref={this.contentRef}>
          {this.props.children}
        </div>
      </div>
    );
  }
}