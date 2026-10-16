import { useEffect, useState } from "react";
import {
  useRive, useViewModel, useViewModelInstance,
  useViewModelInstanceNumber, Layout, Fit,
} from "@rive-app/react-webgl2";

type RiveGuageProps = {
  src: string
  artboard: string
  stateMachine: string
  viewModel: string
  property: string
  value: number
  className: string
}

export default function RiveGauge({ src, artboard, stateMachine, viewModel, property, value, className }: RiveGuageProps) {
  const [loaded, setLoaded] = useState(false);
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachine,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
    onLoad: () => setLoaded(true),
  });

  // Size the canvas to the artboard's shape so Fit.Contain leaves no empty bands
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    const b = loaded && rive?.bounds;
    if (b && b.maxY > b.minY) setAspectRatio((b.maxX - b.minX) / (b.maxY - b.minY));
  }, [loaded, rive]);

  const vm = useViewModel(rive, { name: viewModel });
  const vmi = useViewModelInstance(vm, { rive });
  const { setValue } = useViewModelInstanceNumber(property, vmi);

  useEffect(() => {
    setValue?.(value);
  }, [value, setValue]);

  return (
    // RiveComponent ignores style when given a className, so size this wrapper and let it fill it
    <div className={className} style={{ aspectRatio }}>
      <RiveComponent />
    </div>
  );
}
