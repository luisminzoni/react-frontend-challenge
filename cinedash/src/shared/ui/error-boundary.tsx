import { Component, ReactNode } from 'react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8 gap-4">
            <h2 className="text-xl font-semibold">Algo deu errado</h2>
            <Button onClick={() => window.location.reload()}>
              Recarregar página
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}