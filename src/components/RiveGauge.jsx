import { useEffect } from "react";
import {
  useRive, useViewModel, useViewModelInstance,
  useViewModelInstanceNumber, Layout, Fit,
} from "@rive-app/react-webgl2";

export default function RiveGauge({ src, artboard, stateMachine, viewModel, property, value, className }) {
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachine,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  const vm = useViewModel(rive, { name: viewModel });
  const vmi = useViewModelInstance(vm, { rive });
  const { setValue } = useViewModelInstanceNumber(property, vmi);

  useEffect(() => {
    setValue?.(value);
  }, [value, setValue]);

  return (
    <div className="">
      <RiveComponent className={className} />
    </div>
  );
}
