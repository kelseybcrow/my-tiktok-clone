import React, { Fragment } from 'react'
import styles from '../styles/MainView.module.css'
import Signup from './Signup'
import UploadModal from './UploadModal'
import Video from './Video'
import BottomBar from './BottomBar'
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_HOST } from './../utils/const'
import { getProgramInstance } from '../utils/utils'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

import useAccount from '../hooks/useAccount'
import useTiktok from '../hooks/useTiktok'

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}

const MainView = () => {
    const [isAccount, setAccount] = useState(false)
    const wallet = useWallet()
    const connection = new anchor.web3.Connection(SOLANA_HOST)

    const program = getProgramInstance(connection, wallet)

    const [tiktoks, setTikToks] = useState()

    const [newVideoShow, setNewVideoShow] = useState(false)
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [userDetail, setUserDetail] = useState()

    const { signup } = useAccount()
    const { getTiktoks, likeVideo, createComment, newVideo, getComments } =
        useTiktok(
            setTikToks,
            userDetail,
            videoUrl,
            description,
            setDescription,
            setVideoUrl,
            setNewVideoShow
        )

    useEffect(() => {
        if (wallet.connected) {
            checkAccount()
            getTiktoks()
        }
    }, [])

    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('user'), wallet.publicKey.toBuffer()],
            program.programId
        )

        try {
            const userInfo = await program.account.useAccount.fetch(userInfo)
            console.log(userInfo)
            setUserDetail(userInfo)
            setAccount(true)
        } catch (error) {
            setAccount(false)
        }
    }

    return (
        <>
            {isAccount ? (
                <div>
                    {newVideoShow && <UploadModal />}
                    <div className={styles.appVideos}>
                        {tiktoks.length === 0 ? (
                            <h1>No videos</h1>
                        ) : (
                            tiktoks.map((tiktok, id) => (
                                <Video
                                    key={id}
                                    address={tiktok.publicKey.toBase58()}
                                    url={tiktok.account.videoUrl}
                                    channel={tiktok.account.creatorName}
                                    index={tiktok.account.likes}
                                    description={tiktok.account.description}
                                    likeAddress={tiktok.account.peopleWhoLiked}
                                    commentCount={tiktok.account.commentCount.toNumber()}
                                    likeVideo={likeVideo}
                                    createComment={createComment}
                                    getComments={getComments}
                                />
                            ))
                        )}
                    </div>
                    <BottomBar />
                </div>
            ) : (
                <Signup signup={signup} wallet={wallet.publicKey.toBase58()} />
            )}
        </>
    )
}

export default MainView
