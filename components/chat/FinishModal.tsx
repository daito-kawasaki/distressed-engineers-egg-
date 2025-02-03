import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

type FinishModalProps = {
  questionNumber: number;
};

export default function FinishModal({ questionNumber }: FinishModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (questionNumber >= 5) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [questionNumber]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>お疲れ様でした！これで終了です!</DialogTitle>
            <DialogDescription>
              今回のエンジニア方向選定プロクラムはどうでしたか？？
              あなたに寄り添った方向が選定できていましたら、そのまま
              就活やそれらに活用していっていただければ幸いです♪
              今回のプログラムは満足いただけなかった場合は、回答をもう少し精査するなどして
              何度か行ってみてください。
              私たちはあなたのエンジニアとしてのキャリアが確率されることを願っています!!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
