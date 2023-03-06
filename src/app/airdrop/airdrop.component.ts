import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicKey, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
@Component({
  selector: 'app-airdrop',
  templateUrl: './airdrop.component.html',
  styleUrls: ['./airdrop.component.css'],
})
export class AirdropComponent implements OnInit {
  public airdropForm: FormGroup;
  private address: string = '';
  private amount: number = 1;

  // amount: number = 1
  constructor() {
    this.airdropForm = new FormGroup({});
  }
  createForm() {
    this.airdropForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      amount: new FormControl(1),
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
  airdrop = async () => {
    this.address = this.airdropForm.value.address;
    this.amount = this.airdropForm.value.amount;
    // address: string,
    // amount: number = 1
    const publicKey = new PublicKey(this.address);
    const conn = new Connection('https://api.devnet.solana.com', 'confirmed');
    const sig = await conn.requestAirdrop(
      publicKey,
      this.amount * LAMPORTS_PER_SOL
    );
    const res = await conn.confirmTransaction(sig);
    console.log(res);
  };
}
